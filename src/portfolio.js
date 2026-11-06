const text = (value) => typeof value === 'string' ? value.trim() : ''
const field = (fields,key) => text(fields[key]) || '[À compléter]'
export const letters=['a','b','c']
export const tones=['Courte et directe','Chaleureuse','Professionnelle']
export const countChars=value=>Array.from(value||'').length
export function countExact(value, action){
 const phrase=text(action)
 return phrase ? String(value||'').split(phrase).length-1 : null
}
const escapeCell=value=>value.replaceAll('\\','\\\\').replaceAll('|','\\|').replace(/\r?\n/g,' / ')
export function buildTrace(fields,checks,content){
 const lines=['# Message court de mon projet','','S14 · lundi 9 novembre 2026','Preuve : preuve-14-message-projet-et-variantes','Statut du message : BROUILLON — À RELIRE','','## Point de départ S13']
 const section=(label,id)=>lines.push('',label,field(fields,id))
 section('Source et repère :','source');section('Message rapporté :','message13')
 for(const [id,label] of [['public','Public'],['objectif','Objectif'],['fait1','Fait 1 et appui'],['fait2','Fait 2 et appui'],['action','Action unique']])section(label+' :',id)
 section('## Version humaine S14','humaine')
 for(const [i,letter] of letters.entries())section('## '+letter.toUpperCase()+' · '+tones[i],letter)
 lines.push('','## Comparaison','', '| Variante | Faits et appui | Ton et longueur | Action | Choix et raison |','|---|---|---|---|---|')
 for(const letter of letters){
  const measured=text(fields[letter]) ? countChars(fields[letter])+' caractères':'non mesurée'
  lines.push('| '+[letter.toUpperCase(),field(fields,letter+'_faits'),field(fields,letter+'_ton')+' ('+measured+')',field(fields,letter+'_action'),field(fields,letter+'_choix')].map(escapeCell).join(' | ')+' |')
 }
 for(const [id,label] of [['choix','Variante retenue'],['canal','Canal choisi'],['raisoncanal','Pourquoi ce canal et cette variante ?'],['avant','Avant'],['apres','Après'],['motif','Raison de la correction'],['final','Message retenu en entier'],['regle','Question pour S15']])section('## '+label,id)
 lines.push('','## Autoévaluation',...content.criteres.map((item,index)=>'- ['+(checks[index]?'x':' ')+'] '+item),'','Observation et décision du pilote : en attente.','')
 return lines.join('\n')
}
export function buildIndex(fields){
 return ['# Entrée à ajouter au portfolio du Module 04','','Séance du lundi 9 novembre 2026 · S14','Preuve : preuve-14-message-projet-et-variantes','Livrable : ../04-communication/message-court-projet.md','Source S13 : '+field(fields,'source'),'Choix et canal : '+field(fields,'choix')+' / '+field(fields,'canal'),'Justification : '+field(fields,'raisoncanal'),'Avant : '+field(fields,'avant'),'Après : '+field(fields,'apres'),'Raison de la correction : '+field(fields,'motif'),'Pour S15 : '+field(fields,'regle'),'Observation effectivement faite : [à renseigner par le pilote]','Date et décision du pilote : [en attente]',''].join('\n')
}
export function readS13(markdown){
 const headings={'Document et statut':'source','Public':'public','Action unique':'action','Mon premier message':'message13'}
 const result={}
 const blocks=String(markdown).replaceAll('\r','').split(/^##\s+/m).slice(1)
 for(const block of blocks){
  const line=block.indexOf('\n')
  if(line<0)continue
  const heading=block.slice(0,line).trim()
  if(!Object.hasOwn(headings,heading))continue
  const key=headings[heading]
  const value=block.slice(line+1).trim()
  if(key && value && !/^\[?[Àà] compl[ée]ter\]?\.?$/.test(value))result[key]=value.slice(0,3000)
 }
 return result
}
export function emptyDestinations(input, fields){
 return Object.fromEntries(Object.entries(input).filter(([key])=>!text(fields[key])))
}
