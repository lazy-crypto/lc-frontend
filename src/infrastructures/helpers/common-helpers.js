export default {
    /**
   * Check valid json string
   *
   * @param str
   * @returns {boolean}
   */
    isJsonString (str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }

        return true
    },

    /**
   * Check is empty
   *
   * @param value
   * @returns {boolean}
   */
    isEmpty (value) {
        if (value == null || Object.keys(value).length === 0 || (Array.isArray(value) && value.length === 0)) {
            return true
        }

        return false
    }
}
