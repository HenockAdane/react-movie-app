import myStore from "../index"

export const moreInfoAction = (name) => {
    return{
      type: "MOREINFO",
      name : name
    }
  }

const INITIAL_STATE = {
    name: ""
  }

const moreInfoReducer = (state = INITIAL_STATE, action) =>{
   switch(action.type){
       case "MOREINFO":
           return {...state, name:action.name};
        default:
            return state
   }
  }




export default moreInfoReducer