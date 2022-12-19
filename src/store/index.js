import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  // state = donnée elle-même de l'état
  state: {
    products: [],
    productsInBag: []
  },
  // pour appeler une action, on appelle une méthode dispacth
  // pour appeler une mutation, on appelle une méthode commit
  // donc VueJs ne sera pas confus lorqu'on utilise dispacth pour appeler l'action, idem avec commit donc on peut donner le même nom
  mutations: {
    // Lors d'une mutation, le 1er argument est tjs l'état et le 2ème, les données qu'on veut changer
    // A partir de la mutation, on a accès à l'état
    loadProducts(state, products) {
      // console.log(products);
      state.products = products;
    },
    loadBag(state, products) {
      // console.log(products);
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id);
      state.productsInBag = updatedBag;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag));

    },
  },
  // actions = peut être appelé de n'importe quel composant
  actions: {
    loadProducts({ commit }) {
      axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        // action asynchrone avec commit
        commit('loadProducts' , response.data);
      })
    },
    loadBag({ commit }) {
      if(localStorage.getItem("productsInBag")){
        commit('loadBag' , JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
    addToBag({ commit }, product) {
      commit('addToBag', product);
    },
    removeFromBag({ commit }, productId) {
      if (confirm('Are you sure you want to remove the item from bag?')) {
        commit('removeFromBag', productId);
      }
    },
  },
  modules: {
  }
})
