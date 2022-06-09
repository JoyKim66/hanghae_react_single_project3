import { db } from "../../shared/firebase";
import {collection,getDoc,getDocs,addDoc,updateDoc,doc,
    deleteDoc,} from "firebase/firestore";
import { async } from "@firebase/util";
  

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

//미들웨어
export const loadPostFB = (post_obj) => {
    return async function(dispatch) {
        const post_data = await getDocs(collection(db,"users_data"));
        console.log('middle_load_data: ',post_data)
        
        let post_list = [];
        post_data.forEach((p)=>{
            // console.log(p.id,p.data());
            post_list.push({id:p.id,...p.data()});
        })
        console.log('middle_load_new_data: ',post_list);
        dispatch(loadPost(post_list));
    }
}

export const createPostFB = (post_obj) => {
    return async function(dispatch) {
        const docRef = await addDoc(collection(db,"users_data"),post_obj);
        const post_data = {id:docRef.id,...post_obj};
        console.log('middleware_create_data: ',post_data);
        dispatch(createPost(post_data));
    }
}

export const updatePostFB = (update_data,post_id) => {
    return async function(dispatch,getState){
        // console.log('udt_data,post_id',update_data,post_id)
        const docRef = doc(db,"users_data",post_id)
        // console.log('udt_docref',docRef);
        await updateDoc(docRef,update_data);

        //이미 객체안에 idx가 들어있기때문에 getstate과정이 불필요해지웠다
        // console.log('getState: ',getState().post.list);
        // const _post_list = getState().post.list;
        // const post_index = _post_list.findIndex((p) => {
        //     return p.id === post_id
        // })
        // console.log({post_index,...update_data})
        dispatch(updatePost({...update_data}))
    }
}
export const deletePostFB = (update_data,post_id) => {
    return async function (dispatch,getState) {
        const docRef = doc(db,"users_data",post_id)
        await deleteDoc(docRef);

        dispatch(postDelete(update_data))
    }
}



//리듀서
export default function reducer(state=initialState, action= {}) {
    switch(action.type) {
        case "post/LOAD" : {
            console.log(action);
            return {list: action.post_obj};
        }
        case "post/CREATE" : {
            console.log(state,action)
            const new_post_obj ={user_email:action.post_obj.user_email,
                user_name:action.post_obj.user_name,
                text:action.post_obj.text,
                img:action.post_obj.img,
                time:action.post_obj.time,
                layout_text:action.post_obj.layout_text,
                id:action.post_obj.id
            }
            const new_post_list = [...state.list,new_post_obj]; 
            console.log('reducer_create_data',new_post_list);
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
