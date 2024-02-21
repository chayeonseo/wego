const progressSpinnerSection = document.getElementById('progress-section');

/**
 * GET: 무조건 받아오는 body 데이터가 존재한다고 가정함 => STATUS CODE 200
 * POST: STATUS CODE 201
 * PUT: STATUS CODE 200
 * PATCH: STATUS CODE 200
 * DELETE: STATUS CODE 200
 * RETURN 데이터가 존재하는 METHOD는 'GET' 뿐입니다. 이외는 null 반환
 * RETURN 데이터는 기본적으로 JSON으로 변환된 서버 응답 BODY 입니다.
**/
async function progress_process(requestUrl, method, body = null){
    const csrfToken = document.querySelector('meta[name=_csrf]').getAttribute("content");
    progressSpinnerSection.toggleAttribute('active', true);
    let statusCode;
    let response;
    let requestInitObject = {
        method: method,
        headers: {
            "X-CSRF-TOKEN": csrfToken,
            "Content-Type": "application/json"
        },
        body: body
    };
    switch (method.toUpperCase()){
        case "GET":
            statusCode = 200;
            response = await fetch(requestUrl);
            break;
        case "POST":
            statusCode = 201;
            response = await fetch(requestUrl, requestInitObject);
            break;
        case "DELETE":
            statusCode = 200;
            response = await fetch(requestUrl, requestInitObject);
            break;
        case "PUT":
            statusCode = 200;
            response = await fetch(requestUrl, requestInitObject);
            break;
        case "PATCH":
            statusCode = 200;
            response = await fetch(requestUrl, requestInitObject);
            break;
        default:
            console.log('해당 METHOD는 지원하지 않음!', method);
            return null;
    }
    // console.log('요청중...')
    // 요청이 성공하지 못했거나, 해당되는 status code와 다른 값이 오지 않았다면
    if(response.status !== statusCode || !response.ok){
        console.log('요청 오류가 발생했습니다..')
        return null; // null을 반환 => 받아온 데이터가 없음 판단
    }
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while(true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
        receivedLength += value.length;
        console.log(`응답된 Chunk 데이터 읽는중.. Received ${receivedLength} of ${contentLength}`)
    }
    // GET 요청일 때만 응답 body 데이터를 JSON으로 변경합니다.
    if(method.toUpperCase() === 'GET'){
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for(let chunk of chunks) {
            // console.log('읽은 데이터 ..합체중..')
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
        }
        // 결과는 무조건 json 형태라고 가정하고 작성함. 나중에 단순 문자열/숫자 등 이 추가될 경우에는 수정해야함
        let result = new TextDecoder("utf-8").decode(chunksAll);
        let commits = JSON.parse(result);
        progressSpinnerSection.removeAttribute('active');
        // console.log('처리완료!!')
        return commits;
    }
    progressSpinnerSection.removeAttribute('active');
    return null;
}
