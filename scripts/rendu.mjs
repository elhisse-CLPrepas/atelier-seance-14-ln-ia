export const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
const htmlText = value => '<p>'+escape(value)+'</p>'
export const stepLabels = ['Reprendre S13','Écrire','Comparer','Contrôler','Corriger']
export function buildDemo(cas){
  const panels=[]
  panels.push(['Reprendre les faits de S13','Source · guide S12 V2 à relire et journal V1/V2',[
    htmlText(cas.public), '<div class="demopair"><div><strong>FAIT 01 · GUIDE, ÉTAPE 5</strong>'+escape(cas.fait1)+'</div><div><strong>FAIT 02 · JOURNAL V1/V2</strong>'+escape(cas.fait2)+'</div></div>',
    htmlText('L’action retenue en S13 est « '+cas.action+' »')
  ].join('')])
  panels.push(['Écrire avec ses propres mots','Version humaine du formateur pour le cas fictif',[
    '<blockquote class="word-sample">'+escape(cas.humaine)+'</blockquote>',
    htmlText('Faites repérer les deux faits et souligner la question finale. Lisez les variantes uniquement après avoir conservé cette rédaction.')
  ].join('')])
  const variants=cas.variantes.map(item=>'<article class="variant-display"><span>'+item.id+' / '+escape(item.ton)+'</span><p>'+escape(item.texte)+'</p></article>').join('')
  panels.push(['Lire les trois formulations côte à côte','Trois propositions préparées pour la démonstration', htmlText('Lisez chaque ouverture à voix haute. À quel endroit le ton change-t-il ? Quelle demande reste identique ?')+'<div class="variant-comparison">'+variants+'</div>'])
  const reasons=['Entrée immédiate dans les faits.','Adresse directe au lecteur et salutation.','Vocabulaire plus formel à simplifier pour le public.']
  const observations=cas.variantes.map((item,i)=>'<tr><th scope="row">'+item.id+'</th><td>'+Array.from(item.texte).length+'</td><td>'+String(item.texte.split(cas.action).length-1)+'</td><td>'+reasons[i]+'</td></tr>').join('')
  panels.push(['Comparer les mesures et relire le sens','Mesures reproductibles · arbitrage éditorial à expliquer',htmlText('L’agent relève les faits et cite les sources. Le script Python compare longueurs et occurrences. Faites justifier la dernière colonne par un lecteur.')+'<div class="table-responsive"><table class="demo-table"><thead><tr><th>Version</th><th>Caractères</th><th>Action exacte</th><th>Observation humaine</th></tr></thead><tbody>'+observations+'</tbody></table></div>'])
  panels.push(['Choisir un canal, puis corriger','Choix du formateur dans cet exemple · courriel professionnel',htmlText('La variante C situe le projet dans un courriel auquel le lecteur peut répondre directement. Une phrase reste trop technique pour des formateurs débutants.')+'<div class="demopair"><div><strong>AVANT</strong>'+escape(cas.avant)+'</div><div><strong>APRÈS</strong>'+escape(cas.apres)+'</div></div><details class="revealfinal"><summary>Lire le message retenu en entier</summary>'+htmlText(cas.final)+htmlText(cas.motif)+'</details>'])
  return panels.map(([title,ref,body],i)=>'<article data-panel="'+i+'"><small class="src-ref">ÉTAPE 0'+(i+1)+' / 05</small><h3>'+title+'</h3>'+body+'<p class="src-ref mt-3 mb-0">'+ref+'</p></article>').join('')
}
export function buildFields(data){
  const fields=new Map(data.champs.map(([id,label,hint])=>[id,{label,hint}]))
  function control(id,rows=1,full=false,prefix=''){
    const {label,hint}=fields.get(id)
    const attrs=' id="f-'+id+'" name="'+id+'" maxlength="3000" class="form-control" placeholder="'+escape(hint)+'"'
    let input
    if(id==='choix'){
      input='<select id="f-choix" name="choix" class="form-select"><option value="">Choisissez une variante</option><option>A</option><option>B</option><option>C</option></select>'
    } else{
      input=rows>1?'<textarea'+attrs+' rows="'+rows+'"></textarea>':'<input type="text"'+attrs+'>'
    }
    return '<div class="formfield '+(full?'span-all':'')+'"><label for="f-'+id+'">'+(prefix?'<span class="visually-hidden">'+prefix+' · </span>':'')+escape(label)+'</label>'+input+'</div>'
  }
  function part(n,title,desc,body){return '<fieldset class="workgroup"><legend><span>'+n+'</span> '+title+'</legend><p class="part-desc">'+desc+'</p><div class="input-grid">'+body+'</div></fieldset>'}
  const source=control('source',1,true)+control('message13',2,true)+control('public')+control('objectif')+control('fait1',2)+control('fait2',2)+control('action',1,true)
  const human=control('humaine',3,true)
  const variants=['a','b','c'].map(k=>control(k,3,true)).join('')
  const comparisons=['a','b','c'].map(k=>'<div class="review-row span-all"><h4>Variante '+k.toUpperCase()+'</h4><output data-metrics="'+k+'"></output><div class="input-grid">'+['faits','ton','action','choix'].map(key=>control(k+'_'+key,1,false,k.toUpperCase())).join('')+'</div></div>').join('')
  const decision=control('choix')+control('canal')+control('raisoncanal',2,true)+control('avant',2)+control('apres',2)+control('motif',2,true)+control('final',3,true)+control('regle',2,true)
  return part('01','Reprendre le dossier S13','Gardez le même public, deux faits vérifiables et une seule action.',source)+part('02','Rédiger ma version humaine','Faites ce premier essai avant de solliciter des variantes.',human)+part('03','Conserver trois propositions','Copiez les sorties brutes ou rédigez-les sur votre poste à partir de la fiche fictive.',variants)+part('04','Comparer A, B et C','Un court commentaire par critère suffit. Les mesures sont calculées à partir de vos textes.',comparisons)+part('05','Choisir et corriger','Précisez pourquoi le canal convient à ce public. Conservez les deux formulations et le message retenu.',decision)
}
