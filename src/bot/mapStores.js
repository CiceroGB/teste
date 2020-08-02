const stores = require('./stores');
const messages = require('./messages');
const promotions = require('./promotions');

const mapStores = async (latitude, longitude) => {
  const storesObj = await stores.searchStore(latitude, longitude);

  const near = storesObj.reduce((prev, current) => (
    (prev.location.distance < current.location.distance) ? prev : current));

  if (near.location.distance >= 1) {
    const txt = `Parece que você não está dentro de uma loja Carrefour ainda.
     Bora na mais perto de você!
     Loja: ${near.name}
     Endereço: ${near.street}, ${near.number}, ${near.neighborhood}, ${near.city} - ${near.state}, CEP: ${near.postal_code}
      
     Ei :) , dentro da loja compartilhe novamente sua localização para ver as ofertas exclusisas Telegram Carrefour`;
    return txt;
  }

  const promotionsArray = await promotions.searchPromotion(near.site);

  const message = await messages.searchMessage(near.site);

  const txt = `Bem vindo a loja ${near.name};
    ${message[0].message}
    Oferta exclusiva: 
      ${promotionsArray.map((o) => `${o.product} de ${new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }).format(o.price)} por ${new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }).format(o.promotional_price)} `)}
    Para aproveitar essas ofertas basta informar o código 842jj99 no caixa    
    `;

  return txt;
};

module.exports.mapStores = mapStores;
