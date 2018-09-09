_a = () => {
  console.log('_a : A')
}

_a()

const a = () => {
    console.log('a : A')
}

a()

function slowfunc(callback){
    callback();
}

slowfunc(a);