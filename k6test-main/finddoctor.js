import { sleep, group ,check} from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data'
import { vus,duration,homeurl, doctorprofile } from './env_sunai.js'
// import { SharedArray } from 'k6/data'
export const options = {
  ext: {
    loadimpact: {
      projectID: 3607882,
      // Test runs with the same name groups test runs together
      name: "Search&Find doctors"
    }
  },
     vus: vus,
     duration: duration,
     thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<20001'], // 95% of requests should be below 20000ms
      },
    }

    const data = new SharedArray('some data name', function () {
      return JSON.parse(open('./finddoctorData.json')).users;
    });

   
export default function main() {
  let response

  // This is homepage of MountSinai 
  group(`Page_1 - ${homeurl}`, function () {
    response = http.get(homeurl, {
        tags : {
            my_tag: "Home tag",
          },
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    check(response,{
        "home status is ok 200": (r)=> r.status === 200,
    })
    sleep(1.3)
  })

  group('page_2 - https://www.mountsinai.org/find-a-doctor', function () {
    response = http.get('https://www.mountsinai.org/find-a-doctor', {

      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
      tags : {
        my_tag: "Find a doctor tag"
      }
    })
    check(response,{
        "find doctor status is ok 200": (r)=> r.status === 200,
    })
    sleep(0.9)
    response = http.get('https://doctor.mountsinai.org/fad/autocomplete', {
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'iframe',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
      tags : {
        my_tag: "doctor tag",
      },
    })
    sleep(5.1)
    response = http.get('https://doctor.mountsinai.org/api/autocomplete?searchQuery=Vi', {
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        accept: '*/*',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    response = http.get('https://doctor.mountsinai.org/api/autocomplete?searchQuery=Vik', {
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        accept: '*/*',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    sleep(3.6)
  })
   const user = data[0]
   for(const getdata of data){
  group(`Page_3 : ${doctorprofile}`, function () {
    response = http.get(`${doctorprofile}/${getdata.name}`, {
      headers: {
        'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'upgrade-insecure-requests': '1',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
      },
      tags : {
        my_tag: "Doctors name tag"
      },
    })
    check(response,{
        "doctor found status is ok 200": (r)=> r.status === 200,
    })
    sleep(9.1)
  })
 
   }
  }  
