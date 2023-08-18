export const generateUserErrorsInfo = (user) => {
    return `One or more properties were incomplete or no valid.
    List of require properties:
    *name: need to be String, recived ${user.name}
    *photo: need to be String, recived ${user.photo}
    *email: need to be String, recived ${user.email}
    *age: need to be Number, recived ${user.age}
    *rol: need to be String, recived ${user.rol}
    *password: need to be String, recived ${user.password}
    `
}

export const generateProductErrorsInfo = (product) => {
    return `One or more properties were incomplete or no valid.
    List of require properties:
    *title: need to be String, recived ${product.title}
    *description: need to be String, recived ${product.description}
    *code: need to be String, recived ${product.code}
    *price: need to be Number, recived ${product.price}
    *stock: need to be Number, recived ${product.stock}
    `
}