import { create2dArray, checkPosition } from '../utils/arrayUtil';
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
    it('contains MazeCells', () => {
        expect(arr[0][0]).toBeInstanceOf(MazeCell)
    });
})

describe('checkPosition', () => {
    const arr = create2dArray(10, 10);
    const pos1 = checkPosition(arr, 5, 5);
    const pos2 = checkPosition(arr, 5, 15);
    it('returns true for valid positions', () => {
        expect(pos1).toBeTruthy();
    });
    it('returns false for positions that don\'t exist', () => {
        expect(pos2).toBeFalsy();
    });
})  