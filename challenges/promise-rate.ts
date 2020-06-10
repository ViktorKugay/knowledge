import delay from 'delay';

const urls = ['1', '2', '3', '3', '4', '5'];

main(urls, 3).catch(console.log);

async function main(urls: string[], rateLimit: number) {
  const cache = [];

  let counter = 0;
  let currentIndex = 0;

  return new Promise(resolve => {
    const request = url => {

      counter++;
      currentIndex++;

      const duplicateIndex = findDuplicateIndex(urls, url, currentIndex);
      if (hasDuplicate(duplicateIndex)) {
        cache.push(urls[duplicateIndex]);
      } else {
        delay(1000).then(() => {
          console.log(url);  

          counter--;
          cache.push(url);
  
          if (currentIndex === urls.length) {
            resolve(cache);
          } else {
            request(urls[currentIndex]);
          }
        });
      }

      if (counter < rateLimit) {
        request(urls[currentIndex]);
      }
    };

    request(urls[currentIndex]);
  });
}

function findDuplicateIndex(urls: string[], url: string, currentIndex: number) {
  return urls.slice(0, currentIndex - 1).findIndex(resUrl => url === resUrl);
}

function hasDuplicate(index: number) {
  return index > -1;
}
