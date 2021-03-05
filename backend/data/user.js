import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Sam Smith',
        email: 'sam@test.com',
        password: bcrypt.hashSync('123456' , 10)
    },
    {
        name: 'Mark Brown',
        email: 'mark@test.com',
        password: bcrypt.hashSync('123456' , 10)

    }
]

export default users