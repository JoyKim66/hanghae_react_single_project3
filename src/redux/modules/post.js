const CREATE = "post/CREATE";

const initialState = {list:[]};

//액션함수
export const createPost = (post_obj) => {
    return {type: CREATE, post_obj}
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
            }
            const new_post_list = [...state.list,new_post_obj]; 
            console.log('reducer',new_post_list);
            return {list: new_post_list};
        }

    default: 
        return state;
    }
}
