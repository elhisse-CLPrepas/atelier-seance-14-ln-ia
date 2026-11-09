import assert from 'node:assert/strict'
import {readFile,stat} from 'node:fs/promises'
import {basename} from 'node:path'
import {createHash} from 'node:crypto'
import {Script} from 'node:vm'
import {buildTrace,buildIndex,countChars,countExact,readS13,emptyDestinations} from '../src/portfolio.js'
const root=new URL('../',import.meta.url)
const bytes=file=>readFile(new URL(file,root))
const read=async file=>(await bytes(file)).toString('utf8')
const d=JSON.parse(await read('src/seance.json'))
const c=JSON.parse(await read('public/ressources/demo/cas-guide.json'))
const navigation=['accueil','presentation','methode','demonstration','atelier','prompts','flashcards','quiz','validation','portfolio','ressources']
assert.deepEqual(d.rubriques.map(x=>x[0]),navigation)
assert.deepEqual([d.slides.length,d.cards.length,d.quiz.length,d.prompts.length],[23,8,6,4])
assert.deepEqual(c.variantes.map(v=>countChars(v.texte)),[149,195,166])
assert.deepEqual(c.variantes.map(v=>countExact(v.texte,c.action)),[1,1,1])
assert.equal(countChars(c.final),159);assert.equal(countChars(c.humaine),144)
assert.equal(countExact('test',''),null);assert.equal(countExact('oui oui','oui'),2);assert.equal(countChars('À 🙂'),3)
assert.equal(c.variantes[2].texte.replace(c.avant,c.apres),c.final)
const source=await read('public/ressources/sources/trace-s13-exemple-fictif.md')
const parse=readS13(source.replaceAll('\n','\r\n'));assert.deepEqual(Object.keys(parse).sort(),['source','public','action','message13'].sort());assert.equal(parse.action,c.action)
assert.deepEqual(Object.keys(emptyDestinations(parse,{public:'Saisie existante',source:'Déjà rempli'})).sort(),['action','message13'])
assert.deepEqual(readS13('## constructor\nexemple\n## Autre\ntexte'),{})
assert.deepEqual(readS13('## Public\n[À compléter]'),{})
const f={source:'Cas de contrôle local',fait1:'V1 et V2',fait2:'Journal',public:c.public,action:c.action,humaine:c.humaine,a:c.variantes[0].texte,b:c.variantes[1].texte,c:c.variantes[2].texte,choix:'C',canal:c.canal,avant:c.avant,apres:c.apres,motif:c.motif,final:c.final,a_faits:'Source | p. 1\npassage'}
const tr=buildTrace(f,[true],d),ix=buildIndex(f)
for(const m of [c.humaine,c.avant,c.apres,c.final,c.preuve,'149 caractères','166 caractères','[x]','Source \\| p. 1 / passage'])assert(tr.includes(m),m)
assert(ix.includes('../'+c.trace)&&ix.includes(c.preuve)&&ix.includes(c.motif)&&ix.includes('[en attente]'))
assert.equal(await new Blob([tr],{type:'text/markdown;charset=utf-8'}).text(),tr)
const files=d.groups.flatMap(([,entries])=>entries.map(([p])=>'ressources/'+p))
assert.equal(files.length,32);assert.equal(new Set(files).size,files.length)
assert.equal(d.affiches.length,5)
for(const a of d.affiches){assert.equal(d.slides[a.slide][0],a.title);assert(files.includes('ressources/'+a.path))}
const compiled=await read('dist/index.html'), standalone=await read('OUVRIR-SEANCE-14.html')
for(const html of [compiled,standalone]){
 for(const id of navigation)assert(html.includes('id="'+id+'"')&&html.includes('href="#'+id+'"'))
 assert.equal((html.match(/<section id="/g)||[]).length,11)
 const ids=[...html.matchAll(/\bid="([\w-]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length)
 for(const [key] of d.champs)assert(ids.includes('f-'+key),key)
 assert(html.includes('name="description"')&&html.includes('property="og:image"')&&html.includes('name="twitter:card"'))
 assert(JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]).timeRequired==='PT90M')
 assert(!/<(?:script|link)[^>]+(?:src|href)="https?:[^"]+\.(?:js|css)"/i.test(html))
}
for(const match of compiled.matchAll(/\b(?:href|src)="(\.\/[^"#]+)"/g))assert((await stat(new URL('dist/'+match[1],root))).isFile(),match[1])
assert.deepEqual([...new Set([...compiled.matchAll(/href="\.\/(ressources\/[^"]+)"/g)].map(m=>m[1]))].sort(),[...files].sort())
const inlined=new Map()
for(const m of standalone.matchAll(/href="data:([a-z0-9+./-]+);base64,([A-Za-z0-9+/=]+)" data-resource="([^"]+)" download="([^"]+)"/g)){
 assert.equal(m[4],basename(m[3]))
 if(!inlined.has(m[3]))inlined.set(m[3],Buffer.from(m[2],'base64'))
}
assert.equal(inlined.size,files.length)
for(const file of files){assert((await bytes('public/'+file)).equals(inlined.get(file)),file);assert((await bytes('dist/'+file)).equals(inlined.get(file)),file)}
assert(!/<script[^>]+src=|type="module"|<link[^>]+rel="stylesheet"|(?:href|src)="\.\/(?:assets|ressources)\//.test(standalone))
for(const a of d.affiches){
 assert(compiled.includes('data-poster-resource="'+a.path+'"'))
 assert(standalone.includes('data-poster-resource="'+a.path+'"'))
 assert(standalone.includes('src="data:image/png;base64,'+(await bytes('public/ressources/'+a.path)).toString('base64')+'"'))
}
new Script([...standalone.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1])
const css=await bytes('src/vendor/bootstrap.min.css');assert.equal(createHash('sha256').update(css).digest('hex'),'d85327d99c7a3ee1f9b5d0500d1370acea3ad2db39c163c2f51f232baedbdede')
console.log('11 rubriques, 23 diapositives, 8 cartes, 6 questions et 4 prompts vérifiés.')
console.log('Les 32 ressources autonomes sont identiques aux originaux. Mesures, import S13, préservation des champs et exports Markdown vérifiés.')
