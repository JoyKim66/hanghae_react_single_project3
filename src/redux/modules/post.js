const CREATE = "post/CREATE";
const LOAD = "post/LOAD";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";

const initialState = {list:[]};

//액션함수
export const createPost = (post_obj) => {
    return {type: CREATE, post_obj}
}
export const updatePost = (post_update_obj) => {
    return {type:UPDATE, post_update_obj}
}
export const postDelete = (post_list,post_index) => {
    return {type:DELETE, post_list,post_index}
}
export const loadPost = (post_obj) => {
    return {type: LOAD, post_obj}
}



//리듀서
export default function reducer(state=initialState, action= {}) {
    switch(action.type) {
        case "post/CREATE" : {
            console.log(state,action)
            const new_post_obj ={user_email:action.post_obj.user_email,
                user_name:action.post_obj.user_name,
                text:action.post_obj.text,
                img:action.post_obj.img,
                time:action.post_obj.time,
                layout_text:action.post_obj.layout_text,
            }
            const new_post_list = [...state.list,new_post_obj]; 
            console.log('reducer',new_post_list);
            return {list: new_post_list};
        }
        case "post/UPDATE" : {
            console.log(state,action);
            const new_post_list = state.list.map((l,idx) => {
                if(parseInt(action.post_update_obj.idx) === idx) {
                    return {...l,
                    img:action.post_update_obj.img,
                    layout_text: action.post_update_obj.layout_text,
                    text:action.post_update_obj.text,
                    time:action.post_update_obj.time,
                }}else{
                    return l;
                }
            })
            // console.log({list: new_post_list})
            return {list: new_post_list};
        }
        case "post/DELETE" : {
            console.log(state,action);
            const new_post_list = state.list.filter((l,idx)=>{
                return parseInt(action.post_index) !== idx
            });
            console.log(new_post_list);
            return {list: new_post_list};
        }
    
    default: 
        return state;
    }
}
