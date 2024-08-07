const API_URL = 'https://api.adviceslip.com/advice';
const div = document.querySelector('#div') as HTMLElement;
const btn = document.querySelector('#btn') as HTMLElement;

type Advice = {
    id: number,
    advice: string,
};

type fetchedAdvice = {
    slip: Advice,
};

const fetchAdvice = async (): Promise<Advice | null> => {
    try {
        const res = await fetch(API_URL);
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: fetchedAdvice = await res.json();
        return result.slip;
    }catch(err){
        console.error(err);
        return null;
    }
}

const displayAdvice = async () => {
    const advice: Advice | null = await fetchAdvice();
    if(advice && div){
        div.textContent = advice.advice;
        console.log(advice);
    }
}

displayAdvice();

btn.addEventListener('click', displayAdvice);