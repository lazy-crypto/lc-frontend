export default class BaseEntity {
    constructor (attributes) {
        this.from(attributes)
    }

    from (attributes) {
        Object.keys(attributes).forEach((key) => {
            this[key] = attributes[key]
        })
    }
}
