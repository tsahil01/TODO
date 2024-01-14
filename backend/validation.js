const zod = require('zod')

const UserSchema = zod.object({
    username: zod.string().min(2),
    password: zod.string()
})

const TodoSchema = zod.object({
    title: zod.string(),
    done: zod.boolean()
})

module.exports = {
    TodoSchema,
    UserSchema
}