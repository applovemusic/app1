if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('app1/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registrado com sucesso:', registration.scope);

        // Detecta atualização do SW
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('⚠️ Nova versão disponível. Recarregando...');
              window.location.reload();
            }
          };
        };
      })
      .catch(error => {
        console.error('❌ Erro ao registrar o Service Worker:', error);
      });
  });
}
