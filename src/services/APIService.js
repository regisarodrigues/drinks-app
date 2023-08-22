import api from '../lib/axios';

export default {
  obterCategoria() {
    return api('/list.php?c=list');
  },
  buscarReceitas({ categoria, nome }) {
    return api(`/filter.php?c=${categoria}&i=${nome}`);
  },
  buscarReceita(id) {
    return api(`/lookup.php?i=${id}`);
  }
};
