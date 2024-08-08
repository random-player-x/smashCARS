import {atom, atomFamily, selectorFamily} from 'recoil'

let index= 0;
let array = [];

function randomnum(n){
  for (let i = 0; i < n ;i ++ ){
    let randomnumber = Math.floor((Math.random()* n) + 1);
    if(!array.includes(randomnumber)){
      array.push(randomnumber);
    }
  }
  index++;
  return array[index%n];
}


export const image1id = atom({
    key: 'image1id',
    default: randomnum(54)
})
export const image2id = atom({
    key: 'image2id',
    default: randomnum(54)
})
export const image1post = atom({
    key: 'image1post',
    default: null
})
export const image2post = atom({
    key: 'image2post',
    default: null
})

export const ImageFamiy = atomFamily({
    key: 'ImageFamily',
    default: selectorFamily({
        key: 'selectorfamily',
        get: (id) => async ({get})=>{
            const res = axios.get('http://localhost:3000/images/'+ id);
            return res.data;

        }
    })
})


