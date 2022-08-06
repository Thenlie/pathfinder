import { create2dArray, checkPosition } from '../utils/arrayUtil';
import { describe, it, expect } from 'vitest'

describe('create2dArray', () => {
    // const arr = [];
    it('is Array data type', () => {
        expect(arr).toBeInstanceOf(Array);
    });
    it('is length 10 and width 10', () => {
        expect(arr.length).toBe(10);
        expect(arr[0].length).toBe(10);
    });
    it('contains only zeros', () => {
        expect(arr).toEqual(expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        expect(arr).not.toEqual(expect.arrayContaining([1, 2, 3, 4, 5 ,6, 7, 8, 9, 10]));
    });
})

describe('checkPositon', () => {
    
})