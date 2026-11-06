import { readFile, writeFile } from 'node:fs/promises'
const d = JSON.parse(await readFile(new URL('../src/seance.json', import.meta.url), 'utf8'))
import {escape,buildDemo,buildFields,stepLabels} from './rendu.mjs'
const cas = JSON.parse(await readFile(new URL('../public/ressources/demo/cas-guide.json',import.meta.url),'utf8'))
const digits = n => String(n).padStart(2,'0')
const headings = {
 presentation:['Projection collective','Le diaporama S14','Suivez les 23 diapositives, dont les cinq affiches du Module 04, de l’atelier. Les notes du formateur restent masquées tant que vous ne les ouvrez pas.'],
 methode:['Méthode du candidat','Écrire, comparer, choisir','Six gestes pour passer de la trace S13 à un message corrigé. Ouvrez un geste pour voir ce qui est attendu.'],
 demonstration:['Démonstration guidée','Trois tons pour un même lecteur','Suivez la même proposition de S13 à la correction de S14. Les cinq étapes s’utilisent en projection ou en binôme.'],
 atelier:['Manipuler · dossier candidat','Mon atelier de rédaction','Renseignez votre propre fiche sur ce poste. Vous pourrez télécharger le message et sa comparaison complète avant de passer à S15.'],
 prompts:['Quatre missions à copier','Diriger le travail d’un agent','Définissez les entrées, le travail autorisé et la sortie attendue. Utilisez une fiche fictive pour tout essai connecté.'],
 flashcards:['Mémorisation active','Huit cartes à discuter','Un candidat lit la question, son partenaire propose une réponse et donne un exemple tiré d’une des variantes.'],
 quiz:['Évaluation formative','Six décisions de rédaction','Choisissez une réponse par situation. Consultez les explications avant de préparer votre preuve.'],
 validation:['Revue avant S15','Montrer une correction motivée','Montrez vos trois variantes brutes au formateur et lisez le passage que vous avez corrigé dans la version retenue.'],
 portfolio:['Preuve du lundi 9 novembre','Classer le message et ses variantes','Conservez la première rédaction, les trois propositions, leur comparaison et votre arbitrage.'],
 ressources:['Supports de la séance','Les ressources à emporter','Téléchargez les documents éditables, les versions à imprimer ou les fichiers de démonstration pour travailler hors ligne.']
}
const icons = {
 home:'M3 10 12 3l9 7v10h-6v-7H9v7H3z',play:'M7 4l13 8-13 8z',compass:'M19 5l-4 10-10 4 4-10z',layers:'M2 8l10-5 10 5-10 5zM3 12l9 5 9-5M3 16l9 5 9-5',edit:'M4 19l4-1L20 6l-3-3L5 15zM13 6l4 4',braces:'M9 3H7v6l-3 3 3 3v6h2M15 3h2v6l3 3-3 3v6h-2',cards:'M7 5h13v14H7zM4 8H2v13h13v-1',help:'M8 8a4 4 0 0 1 8 0c0 3-4 3-4 7m0 4h.01',check:'M3 12l6 6L21 5',folder:'M2 6h7l2 3h11v11H2z',book:'M3 5h6l3 2 3-2h6v14h-6l-3 2-3-2H3zM12 7v14'
}
const svg = k=>'<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="'+icons[k]+'"/></svg>'
const groups=d.groups
const values={}
const posterCard=a=>'<article class="poster-card"><a data-slide="'+a.slide+'" data-poster-resource="'+a.path+'" href="./ressources/'+a.path+'"><img src="./ressources/'+a.path+'" alt="'+escape(a.title)+'" loading="lazy" width="1056" height="1492"></a><div><h3>'+escape(a.title)+'</h3><p>'+escape(a.summary)+'</p><button type="button" class="mini" data-slide="'+a.slide+'">Projeter l’affiche ▷</button> <a class="inklink" href="./ressources/'+a.path+'" download>PNG ↓</a></div></article>'
values.affiches=d.affiches.map(posterCard).join('')
values.afficheatelier=d.affiches.filter(a=>a.path==='affiches/seance-14.png').map(posterCard).join('')
values.affichessuite=d.affiches.filter(a=>['affiches/seance-15.png','affiches/seance-16.png'].includes(a.path)).map(posterCard).join('')
values.nav=d.rubriques.map(([id,t,icon],n)=>'<a href="#'+id+'" data-nav="'+id+'">'+svg(icon)+'<span>'+t+'</span><small>'+digits(n+1)+'</small></a>').join('')
values.calendar=d.cal.map(([n,date,v,copy],i)=>'<article class="session '+(i===1?'current':'')+'"><small>S'+n+' / '+date+'</small><h3>'+v+'</h3><p>'+copy+'</p></article>').join('')
values.slideindex=d.slides.map(([t],i)=>'<button class="s-index" data-slide="'+i+'"><span>'+digits(i+1)+'</span><b>'+escape(t)+'</b><i aria-hidden="true">↗</i></button>').join('')
values.questions=d.questions.map(([a,b,c],i)=>'<details class="qcard"><summary><small>'+a+'</small><b>'+escape(b)+'</b><i aria-hidden="true">+</i></summary><p>'+escape(c)+'</p></details>').join('')
values.roles=d.roles.map(([a,b])=>'<div><b>'+a+'</b><p>'+escape(b)+'</p></div>').join('')
values.demobuttons=stepLabels.map((a,i)=>'<button type="button" data-demo="'+i+'"><small>'+digits(i+1)+'</small> '+a+'</button>').join('')
values.demopanels=buildDemo(cas)
values.atelierfields=buildFields(d)
values.ouverture=escape(cas.ouverture)
values.casjson=JSON.stringify(cas).replaceAll('<','\\u003c')
values.prompts=d.prompts.map(([a,b,c],i)=>'<article class="promptcard"><small>'+a+'</small><h3>'+b+'</h3><p id="prompt-'+i+'">'+escape(c)+'</p><button class="mini" data-copy="'+i+'">Copier le prompt ⧉</button></article>').join('')
values.quiz=d.quiz.map(([q,options],i)=>'<fieldset class="quizq"><legend><span>'+digits(i+1)+'</span> '+escape(q)+'</legend>'+options.map((s,k)=>'<label><input class="form-check-input" type="radio" value="'+k+'" name="q'+i+'"> <span>'+escape(s)+'</span></label>').join('')+'<p class="qfeedback" id="feedback-'+i+'" hidden></p></fieldset>').join('')
values.criteria=d.criteres.map((c,i)=>'<label class="criterion"><input class="form-check-input" type="checkbox" data-criterion="'+i+'"> <span>'+escape(c)+'</span></label>').join('')
values.resources=groups.map(([title,entries])=>'<div class="resource-group"><h3>'+title+'</h3><div class="downloads">'+entries.map(([p,t,fmt])=>'<a href="./ressources/'+p+'" download><span class="format">'+fmt+'</span><span>'+escape(t)+'</span><b aria-hidden="true">↓</b></a>').join('')+'</div></div>').join('')
for(const [id,[k,title,intro]] of Object.entries(headings))values['head:'+id]='<div class="section-head"><p class="eyebrow"><i></i> '+escape(k.toUpperCase())+'</p><h2 id="titre-'+id+'">'+escape(title)+'</h2><p>'+escape(intro)+'</p></div>'
let baseURL
if (process.env.ATELIER_PUBLIC_URL) {
  baseURL=new URL(process.env.ATELIER_PUBLIC_URL)
  if(!['http:','https:'].includes(baseURL.protocol)) throw new Error('ATELIER_PUBLIC_URL doit être une URL HTTP(S) publique')
  if(!baseURL.pathname.endsWith('/')) baseURL.pathname+='/'
}
values.ogimage=baseURL?escape(new URL('ressources/atelier/affiche-s14.png',baseURL).href):'./ressources/atelier/affiche-s14.png'
values.canonical=baseURL?'<link rel="canonical" href="'+escape(baseURL.href)+'"><meta property="og:url" content="'+escape(baseURL.href)+'">':''
values.jsonld=JSON.stringify({'@context':'https://schema.org','@type':'LearningResource',name:'Un message, trois variantes — séance 14',inLanguage:'fr',educationalLevel:'Initiation',teaches:'Comparer trois variantes et justifier une correction éditoriale',learningResourceType:'Atelier de formation',timeRequired:'PT90M',author:{'@type':'Person',name:'Abderrahman El Hisse'},isPartOf:{'@type':'Course',name:'Challenge 100 Jours — Apprendre à produire avec l’IA'},...(baseURL?{url:baseURL.href}:{})}).replaceAll('<','\\u003c')
const tmpl=await readFile(new URL('../src/atelier.html',import.meta.url),'utf8')
const page=tmpl.replace(/\{\{([a-z:]+)\}\}/g,(_,k)=>{if(!(k in values))throw new Error('Clé inconnue '+k);return values[k]})
await writeFile(new URL('../index.html',import.meta.url),page)
