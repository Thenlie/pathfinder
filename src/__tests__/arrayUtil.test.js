import { create2dArray, checkPosition, createNew2dArray, checkNewPosition } from '../utils/arrayUtil';
import { MazeCell } from '../lib/MazeCell';
import { describe, it, expect } from 'vitest';

describe('create2dArray', () => {
    const arr = create2dArray(10, 10);
    it('is Array data type', () => {
        expect(arr).toBeInstanceOf(Array);
    });
    it('is length 10 and width 10', () => {
        expect(arr.length).toBe(10);
        expect(arr[0].length).toBe(10);
    });
    it('contains only zeros', () => {
        expect(arr[0]).toEqual(expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
        expect(arr[0]).not.toEqual(expect.arrayContaining([1, 2, 3, 4, 5 ,6, 7, 8, 9, 10]));
    });
})

describe('checkPositon', () => {
    const arr = create2dArray(10, 10);
    const pos1 = checkPosition(arr, 5, 5);
    const pos2 = checkPosition(arr, 5, 15);
    it('returns 0 for empty positions', () => {
        expect(pos1).toEqual(0);
    });
    it('returns null for positions that don\'t exist', () => {
        expect(pos2).toBeNull();
    });
})  

describe('createNew2dArray', () => {
    const arr = createNew2dArray(10, 10);
    it('is Array data type', () => {
        expect(arr).toBeInstanceOf(Array);
    });
    it('is length 10 and width 10', () => {
        expect(arr.length).toBe(10);
        expect(arr[0].length).toBe(10);
    });
    it('contains MazeCells', () => {
        expect(arr[0][0]).toBeInstanceOf(MazeCell)
    });
})

describe('checkNewPositon', () => {
    const arr = createNew2dArray(10, 10);
    const pos1 = checkNewPosition(arr, 5, 5);
    const pos2 = checkNewPosition(arr, 5, 15);
    it('returns true for valid positions', () => {
        expect(pos1).toBeTruthy();
    });
    it('returns false for positions that don\'t exist', () => {
        expect(pos2).toBeFalsy();
    });
})  