
  addtoCart(product){
    let cartId = localStorage.get('cartId');
    if (!cartId){
      this.db.list('/shoppingcart').push({
        dateCreated: newDate().getTime()
      })
    }
  }