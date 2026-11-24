(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const defaults = { language: 'en', audio: true, volume: 70, keyboard: true, scale: '1', gameUrl: '' };
  let state = {...defaults};
  try { const saved = JSON.parse(localStorage.getItem('gta-menu-settings-v2') || '{}'); if (saved && typeof saved === 'object') state = {...state,...saved}; } catch (_) {}
  const save = () => { try { localStorage.setItem('gta-menu-settings-v2', JSON.stringify(state)); return true; } catch (_) { return false; } };
  const langs = ['pt-BR','es','fr','de','it'];
  const dictionary = {
    'game connection':['conectar jogo','conectar juego','connecter le jeu','Spiel verbinden','collega gioco'],
    'Main menu':['Menu principal','Menú principal','Menu principal','Hauptmenü','Menu principale'],
    'start game':['iniciar jogo','iniciar juego','démarrer','Spiel starten','inizia partita'],
    'map':['mapa','mapa','carte','Karte','mappa'], 'options':['opções','opciones','options','Optionen','opzioni'], 'quit game':['sair do jogo','salir del juego','quitter','Spiel verlassen','esci'],
    'Game':['Jogo','Juego','Jeu','Spiel','Partita'], 'new game':['novo jogo','nueva partida','nouvelle partie','neues Spiel','nuova partita'], 'load game':['carregar jogo','cargar partida','charger','Spiel laden','carica partita'], 'delete game':['excluir jogo','borrar partida','supprimer','Spiel löschen','elimina partita'], 'back':['voltar','volver','retour','zurück','indietro'], 'Back':['Voltar','Volver','Retour','Zurück','Indietro'],
    'Options':['Opções','Opciones','Options','Optionen','Opzioni'], 'controller setup':['controles','controles','commandes','Steuerung','comandi'], 'audio setup':['áudio','audio','audio','Audio','audio'], 'display setup':['tela','pantalla','affichage','Anzeige','schermo'], 'language':['idioma','idioma','langue','Sprache','lingua'], 'Language':['Idioma','Idioma','Langue','Sprache','Lingua'],
    'New Game':['Novo jogo','Nueva partida','Nouvelle partie','Neues Spiel','Nuova partita'], 'Load Game':['Carregar jogo','Cargar partida','Charger','Spiel laden','Carica partita'], 'Delete Game':['Excluir jogo','Borrar partida','Supprimer','Spiel löschen','Elimina partita'], 'Quit Game':['Sair do jogo','Salir del juego','Quitter','Spiel verlassen','Esci'],
    'Are you sure you want to quit?':['Tem certeza de que deseja sair?','¿Seguro que quieres salir?','Voulez-vous quitter ?','Möchtest du wirklich beenden?','Vuoi davvero uscire?'], 'yes':['sim','sí','oui','ja','sì'], 'no':['não','no','non','nein','no'], 'main menu':['menu principal','menú principal','menu principal','Hauptmenü','menu principale'],
    'Menu closed. You can close this tab or return to the main menu.':['Menu encerrado. Feche a aba ou volte ao menu principal.','Menú cerrado. Cierra la pestaña o vuelve al menú principal.','Menu fermé. Fermez cet onglet ou revenez au menu.','Menü geschlossen. Tab schließen oder zum Hauptmenü zurückkehren.','Menu chiuso. Chiudi la scheda o torna al menu.'],
    'No saves available':['Nenhum save disponível','No hay partidas guardadas','Aucune sauvegarde','Keine Spielstände','Nessun salvataggio'], 'No save system is connected to this menu.':['Nenhum sistema de saves está conectado a este menu.','No hay un sistema de guardado conectado.','Aucun système de sauvegarde connecté.','Kein Speichersystem verbunden.','Nessun sistema di salvataggio collegato.'], 'Real saves must be managed inside the connected game.':['Os saves reais devem ser gerenciados dentro do jogo conectado.','Gestiona las partidas dentro del juego conectado.','Gérez les sauvegardes dans le jeu connecté.','Spielstände im verbundenen Spiel verwalten.','Gestisci i salvataggi nel gioco collegato.'],
    'Controller Setup':['Controles','Controles','Commandes','Steuerung','Comandi'], 'Audio Setup':['Áudio','Audio','Audio','Audio','Audio'], 'Display Setup':['Tela','Pantalla','Affichage','Anzeige','Schermo'],
    'These controls apply to the menu only.':['Estes controles valem apenas para o menu.','Estos controles solo se aplican al menú.','Ces commandes concernent uniquement le menu.','Diese Steuerung gilt nur für das Menü.','Questi comandi valgono solo per il menu.'], 'Select option':['Selecionar opção','Seleccionar opción','Choisir','Option wählen','Seleziona opzione'], 'Activate option':['Ativar opção','Activar opción','Activer','Option aktivieren','Attiva opzione'], 'Enable arrow key navigation':['Ativar navegação por setas','Activar navegación con flechas','Activer les flèches','Pfeiltasten aktivieren','Attiva navigazione con frecce'],
    'Menu sounds':['Sons do menu','Sonidos del menú','Sons du menu','Menütöne','Suoni del menu'], 'Volume':['Volume','Volumen','Volume','Lautstärke','Volume'], 'Test sound':['Testar som','Probar sonido','Tester le son','Ton testen','Prova suono'], 'Menu text size':['Tamanho do texto','Tamaño del texto','Taille du texte','Textgröße','Dimensione testo'], 'Normal':['Normal','Normal','Normal','Normal','Normale'], 'Large':['Grande','Grande','Grand','Groß','Grande'], 'Toggle fullscreen':['Alternar tela cheia','Alternar pantalla completa','Plein écran','Vollbild umschalten','Schermo intero'], 'Fullscreen unavailable.':['Tela cheia indisponível.','Pantalla completa no disponible.','Plein écran indisponible.','Vollbild nicht verfügbar.','Schermo intero non disponibile.'],
    'No game is included in this project. Configure a game URL to continue.':['Este projeto não inclui o jogo. Configure o endereço do jogo para continuar.','Este proyecto no incluye el juego. Configura su URL.','Ce projet ne contient pas le jeu. Configurez son URL.','Dieses Projekt enthält kein Spiel. Spiel-URL einrichten.','Questo progetto non include il gioco. Configura il suo URL.'], 'Game URL or relative path':['URL ou caminho relativo do jogo','URL o ruta relativa','URL ou chemin relatif','Spiel-URL oder relativer Pfad','URL o percorso relativo'], 'Save and launch':['Salvar e iniciar','Guardar e iniciar','Enregistrer et lancer','Speichern und starten','Salva e avvia'], 'Clear URL':['Limpar URL','Borrar URL','Effacer URL','URL löschen','Cancella URL'], 'Invalid game URL.':['Endereço do jogo inválido.','URL no válida.','URL invalide.','Ungültige Spiel-URL.','URL non valido.'], 'URL cleared.':['URL removida.','URL borrada.','URL effacée.','URL gelöscht.','URL cancellato.'],
    'Map Legend':['Legenda do mapa','Leyenda del mapa','Légende','Kartenlegende','Legenda mappa'], 'Show legend (L)':['Mostrar legenda (L)','Mostrar leyenda (L)','Afficher légende (L)','Legende zeigen (L)','Mostra legenda (L)'], 'Hide legend (L)':['Ocultar legenda (L)','Ocultar leyenda (L)','Masquer légende (L)','Legende ausblenden (L)','Nascondi legenda (L)'],
    'mod garage':['oficina','taller','garage','Werkstatt','officina'], 'safe house':['casa segura','refugio','planque','Unterschlupf','rifugio'], 'barbers':['barbearia','peluquería','coiffeur','Friseur','barbiere'], 'tattoo':['tatuagem','tatuajes','tatouage','Tattoo','tatuaggi'], 'clothes shop':['loja de roupas','tienda de ropa','vêtements','Kleidung','abbigliamento'], 'trucking':['transporte','transporte','transport','Transport','trasporto'], 'race tournament':['corridas','carreras','courses','Rennen','gare'], 'girl friend':['namorada','novia','petite amie','Freundin','fidanzata'], 'property for sale':['imóvel à venda','propiedad en venta','propriété à vendre','Immobilie zu verkaufen','proprietà in vendita']
  };
  const t = key => dictionary[key]?.[langs.indexOf(state.language)] || key;
  window.gtaMenuTranslate = t;
  function renderLanguage() {
    document.documentElement.lang = state.language;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-language]').forEach(el => { el.setAttribute('aria-pressed', String(el.dataset.language === state.language)); });
  }
  if (!['en',...langs].includes(state.language)) state.language='en';
  renderLanguage();
  document.querySelectorAll('[data-language]').forEach(el => el.addEventListener('click', () => { state.language=el.dataset.language; save(); renderLanguage(); }));
  const sound = new Audio('./sounds/button.wav');
  function play() { if (!state.audio) return; try { sound.volume = Math.max(0, Math.min(1, Number(state.volume)/100 || 0)); sound.currentTime = 0; const promise=sound.play(); if(promise) promise.catch(()=>{}); } catch (_) {} }
  let activated=false;
  document.addEventListener('pointerdown',()=>{activated=true;});
  document.addEventListener('keydown',()=>{activated=true;});
  document.addEventListener('pointerover',e=>{if(activated && e.target.closest('.menu-option a,.menu-option button') && !e.target.closest('.menu-option a,.menu-option button').contains(e.relatedTarget)) play();});
  document.addEventListener('focusin',e=>{if(activated && e.target.matches('.menu-option a,.menu-option button')) play();});
  document.addEventListener('click',e=>{if(e.target.closest('.menu-option a,.menu-option button,#legend-toggle')) play();});
  const bind = (id,key,read,apply) => { const el=$(id); if(!el)return; apply(el,state[key]); el.addEventListener('input',()=>{state[key]=read(el); save(); apply(el,state[key]);}); };
  bind('keyboard-enabled','keyboard',e=>e.checked,(e,v)=>e.checked=!!v);
  bind('audio-enabled','audio',e=>e.checked,(e,v)=>e.checked=!!v);
  bind('audio-volume','volume',e=>Number(e.value),(e,v)=>{e.value=v; $('volume-value').textContent=e.value+'%';});
  $('audio-test')?.addEventListener('click',play);
  const scale=()=>document.documentElement.style.setProperty('--menu-scale',state.scale==='1.2'?'1.2':'1'); scale();
  bind('text-size','scale',e=>e.value,(e,v)=>{e.value=v;scale();});
  $('fullscreen')?.addEventListener('click',async()=>{try { if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); $('display-status').textContent=''; } catch(_) { $('display-status').textContent=t('Fullscreen unavailable.'); }});
  document.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,textarea,select,[contenteditable=true]'))return;
    if(e.key==='Escape'&&!document.fullscreenElement){const back=document.querySelector('.menu-option--back a,.menu-option--back-left a,#quit-confirm') ; if(back){e.preventDefault(); location.href=back.href; return;}}
    if(!state.keyboard||!['ArrowDown','ArrowUp'].includes(e.key))return;
    const links=[...document.querySelectorAll('.menu-option a,.menu-option button')].filter(el=>el.getClientRects().length&&!el.disabled); if(!links.length)return;
    e.preventDefault(); const i=links.indexOf(document.activeElement); links[i<0?(e.key==='ArrowDown'?0:links.length-1):(i+(e.key==='ArrowDown'?1:-1)+links.length)%links.length].focus();
  });
  function urlFor(value) { try { const raw=String(value||'').trim(); if(!raw)return null; const url=new URL(raw,location.href); if(['http:','https:'].includes(url.protocol)||(url.protocol==='file:'&&location.protocol==='file:'&&!/^[a-z][a-z\d+.-]*:/i.test(raw)&&!raw.startsWith('//')))return url.href; } catch(_){} return null; }
  const configured = () => urlFor(state.gameUrl === null ? '' : (state.gameUrl || window.GTA_MENU_CONFIG?.gameUrl));
  document.querySelector('[data-launch]')?.addEventListener('click',e=>{const url=configured(); if(url){e.preventDefault();location.assign(url);}});
  if($('game-form')) {
    $('game-url').value=state.gameUrl === null ? '' : (state.gameUrl||window.GTA_MENU_CONFIG?.gameUrl||'');
    $('game-form').addEventListener('submit',e=>{e.preventDefault();const url=urlFor($('game-url').value);if(!url){$('game-status').textContent=t('Invalid game URL.');return;}state.gameUrl=$('game-url').value.trim();save();location.assign(url);});
    $('clear-game').addEventListener('click',()=>{state.gameUrl=null;save();$('game-url').value='';$('game-status').textContent=t('URL cleared.');});
  }
  const quit=$('quit-confirm'); if(quit)quit.addEventListener('click',e=>{e.preventDefault();const subtitle=document.querySelector('.menu-subtitle');subtitle.dataset.i18n='Menu closed. You can close this tab or return to the main menu.';const menu=document.querySelector('.menu-container');menu.innerHTML='<li class="menu-option"><a href="./index.html" data-i18n="main menu">main menu</a></li>';renderLanguage();menu.querySelector('a').focus();});
})();
