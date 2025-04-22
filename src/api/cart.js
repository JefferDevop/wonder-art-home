
import { forEach } from "lodash";
import { CART } from "../config/constants";

export class Cart {

  // add(itemId, quantity) {
  //   const products = this.getAll();

  //   const objIndex = products.findIndex((product) => product.id === itemId);

  //   if (objIndex < 0) {
  //     products.push({
  //       id: itemId,
  //       quantity,
  //     });
  //   } else {
  //     const product = products[objIndex];
  //     products[objIndex].quantity = product.quantity + quantity;
  //   }
  //   localStorage.setItem(CART, JSON.stringify(products));
  // }


  add(itemId, quantity, maxQuantity) {
    // Validaciones iniciales
    if (!itemId) {
        return { success: false, message: "ID del producto inválido.", addedQuantity: 0, totalQuantity: 0 };
    }

    if (typeof quantity !== "number" || quantity <= 0) {
        return { success: false, message: "Cantidad inválida. Debe ser un número mayor a 0.", addedQuantity: 0, totalQuantity: 0 };
    }

    if (typeof maxQuantity !== "number" || maxQuantity < 0) {
        return { success: false, message: "Stock máximo inválido.", addedQuantity: 0, totalQuantity: 0 };
    }

    const products = this.getAll();
    let message = "";
    let finalQuantity = quantity;

    const objIndex = products.findIndex((product) => product.id === itemId);
    let previousQuantity = objIndex >= 0 ? products[objIndex].quantity : 0; // Cantidad previa en carrito

    if (objIndex < 0) {
        // Si el producto no está en el carrito, verifica si la cantidad es válida
        if (quantity > maxQuantity) {
            finalQuantity = maxQuantity; // Ajusta al máximo disponible
            message = `Solo se agregaron ${maxQuantity} unidades porque el stock ha cambiado.`;
        } else if (quantity === 0 || maxQuantity === 0) {
            message = `No hay stock disponible para este producto.`;
            return { success: false, message, addedQuantity: 0, totalQuantity: 0 };
        } else {
            message = `Producto agregado con éxito (${quantity} unidades).`;
        }
        products.push({ id: itemId, quantity: finalQuantity });
    } else {
        // Si el producto ya está en el carrito, sumamos la cantidad sin superar el stock
        const product = products[objIndex];
        const newQuantity = product.quantity + quantity;

        if (newQuantity > maxQuantity) {
            finalQuantity = maxQuantity - product.quantity; // Cantidad realmente agregada
            if (finalQuantity > 0) {
                message = `Solo se pudieron agregar ${finalQuantity} unidades. El stock disponible ha cambiado.`;
            } else {
                message = `No se pudieron agregar más unidades porque se alcanzó el límite del stock (${maxQuantity}).`;
                return { success: false, message, addedQuantity: 0, totalQuantity: maxQuantity };
            }
            products[objIndex].quantity = maxQuantity;
        } else {
            products[objIndex].quantity = newQuantity;
            message = `Se agregaron ${quantity} unidades al carrito.`;
        }
    }

    localStorage.setItem(CART, JSON.stringify(products));

    return {
        success: true,
        message,
        addedQuantity: finalQuantity,
        totalQuantity: products.find(p => p.id === itemId)?.quantity || 0,
        previousQuantity
    };
}





  decrease(itemId) {
    const products = this.getAll();

    const objIndex = products.findIndex((product) => product.id === itemId);

    if (objIndex >= 0) {
      const product = products[objIndex];
      if (product.quantity > 1) {
        products[objIndex].quantity = product.quantity - 1;
        localStorage.setItem(CART, JSON.stringify(products));
      } else {
        this.delete(itemId);
      }
    }
  }

  increment(itemId) {
    const products = this.getAll();

    const objIndex = products.findIndex((product) => product.id === itemId);

    if (objIndex >= 0) {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + 1;
      localStorage.setItem(CART, JSON.stringify(products));
    }
  }

  delete(itemId) {
    const products = this.getAll();
    const objIndex = products.filter((product) => product.id !== itemId);
    localStorage.setItem(CART, JSON.stringify(objIndex));
  }

  getAll() {
    const response = localStorage.getItem(CART);
    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  deleteAll(){
    localStorage.removeItem(CART);
  }


  count() {
    let count = 0;
    const response = this.getAll();

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }
}
