/**
 * @author Jongil Yoon
 * @email jiysait@gmail.com
 * @create date 2021-08-30 09:34:15
 * @modify date 2021-08-30 09:34:15
 * @desc [description]
 */

/**
 * Pick an item if the item is a member of array of second argument
 */
export function pick(obj, keys) {
  return keys
    .map((k) => (k.value in obj ? { [k.value]: obj[k.value] } : {}))
    .reduce((res, o) => Object.assign(res, o), {});
}
