class UserDTO {
    constructor(user) {
        this.name = user.name,
        this.photo = user.photo,
        this.email = user.email,
        this.age = user.age,
        this.role = user.role,
        this.password = user.password
    }
}


export default UserDTO;