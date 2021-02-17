import {todoReducer} from './todos-slice';

test('Toggles a todo based on id', () => {
    const initialState = [{id:0, text:'test todo', completed:false}];
    const action = {type: 'todos/todoToggle', payload:0};
    const result = todoReducer(initialState, action);
    expect(result[0].completed).toBe(true);
})