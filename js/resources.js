/* Resources.js
 * Esta é apenas uma funcionalidade de carregamento de imagens.
 * Facilita o processo de carregamento de imagens para que elas
 * possam ser usadas em seu jogo. Também inclui uma camada
 * simples de "caching", para que imagens cujo "cache" foi 
 * feito sejam reutilizadas caso você tente carregar a mesma
 * imagem várias vezes.
 * 
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* Esta é a função de carregamento de imagens disponível
     * publicamente. Ela aceita uma array de strings que leva
     * a arquivos de imagem ou uma string de uma só imagem.
     * Depois, chama nossa função privada de carregamento 
     * de imagens de maneira adequada.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* Se o desenvolvedor passar uma array de imagens,
             * faça o loop por cada valor e chame nosso
             * carregador de imagens no arquivo de imagem.
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* O desenvolvedor não passou uma array para esta
             * função; suponha que o valor seja uma string
             * e chame nosso carregador de imagens diretamente.
             */
            _load(urlOrArr);
        }
    }

    /* Esta é a função do carregador de imagens privado, que
     * é chamado pela função do carregador de imagens público.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* Se esta URL já tiver sido carregada, ela
             * existirá em nossa array resourceCache. Basta
             * retornar aquela imagem em vez de recarregá-la.
             */
            return resourceCache[url];
        } else {
            /* Esta URL não foi carregada anteriormente e não
             * está em nosso cache; precisaremos carregá-la.
             */
            var img = new Image();
            img.onload = function() {
                /* Depois que a imagem tiver sido carregada,
                 * adicione-a ao cache para que possamos apenas
                 * retorná-la caso o desenvolvedor tente
                 * carregar o arquivo novamente no futuro.
                 */
                resourceCache[url] = img;

                /* Depois que a imagem tiver mesmo sido
                 * carregada e seu cache tiver sido feito,
                 * chame todos os callbacks de onReady()
                 * que definimos.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Define o valor inicial do cache como false, isso
             * mudará quando o manipulador do evento onload da
             * imagem for chamado. Por fim, direcione o atributo
             * src da imagem para a URL definida.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* Isto é usado por desenvolvedores para pegar referências
     * de imagens que eles sabem que já foram carregadas. Se o 
     * cache de uma imagem é feito, isso tem o mesmo efeito
     * que chamar load() naquela URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* Esta função determina se todas as imagens solicitadas
     * para carregamento foram carregadas corretamente.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* Essa função adicionará uma função ao stack de
     * callback que é chamado quando todas as imagens
     * solicitadas forem corretamente carregadas.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* Este objeto define as funções acessíveis
     * publicamente aos desenvolvedores ao criar
     * um ojeto de Recursos global.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
