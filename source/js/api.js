const DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

async function sendRequest (form, onWait, onSuccess, onReject, onResolve) {

  try {
    onWait();

    const formData = new FormData(form);

    const options = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    const response = await fetch(DATA_URL, options);
    if (response.ok) {
      onSuccess();
    } else {
      onReject();
    }

  } catch (err) {
    console.log('Ошибка: ' + err);

  } finally {
    setTimeout(() => {
      onResolve()
    }, 2500);
  }
}

export {sendRequest};
