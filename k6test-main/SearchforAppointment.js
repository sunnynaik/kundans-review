import { sleep, group, check } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data'
import { vus,duration, homeurl, latestdoctor, avaiableurl } from './env_sunai.js'


export const options = { 
  ext: {
    loadimpact: {
      projectID: 3607882,
      // Test runs with the same name groups test runs together
      name: "Availbale for APT"
    }
  },
    vus: vus,
    duration: duration,
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<2001'], // 95% of requests should be below 2000ms
      },
 }

 const data = new SharedArray('some data name', function () {
  return JSON.parse(open('./SearchAptData.json')).users;
});

export default function main() {
  let response

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
    sleep(2.7)
    response = http.get('https://doctor.mountsinai.org/fad/autocomplete/lite', {
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
    })
    sleep(4.6)
  })

  group(
    `Page_2 : ${latestdoctor}`,
    function () {
      response = http.get(
       latestdoctor,
        {
          tags : {
            my_tag: "latest doctors tag",
          },
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
        }
      )
      check(response,{
        "find a doctor status is ok 200": (r)=> r.status === 200,
    })
      sleep(24.9)
    }
  )

  const user = data[0];
for(const getdata of data){
 // console.log(getdata);


  group(
    `Page_3 : ${avaiableurl}`,
    function () {
      response = http.get(
        `${avaiableurl}?doctor-name=${getdata.name}&pid=${getdata.pid}&officeId=${getdata.officeId}&epicVisitId=2252`,
        {
          tags : {
            my_tag: "Available doctor tag",
          },
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
        }
      )
      check(response,{
        "appointment available  status is ok 200": (r)=> r.status === 200,
    })
      sleep(1)
      // response = http.get(
      //   'https://doctor.mountsinai.org/_next/image?url=%2Fassets%2Fmap_icon.svg&w=16&q=75',
      //   {
      //     headers: {
      //       'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      //       'if-none-match': 'S3SCpZxTm9eq374QC78YT4gKEwIYEQDvxfp-S5biTOw=',
      //       'sec-ch-ua-mobile': '?0',
      //       'sec-ch-ua-platform': '"Windows"',
      //       accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      //       'sec-fetch-site': 'same-origin',
      //       'sec-fetch-mode': 'no-cors',
      //       'sec-fetch-dest': 'image',
      //       'accept-encoding': 'gzip, deflate, br',
      //       'accept-language': 'en-US,en;q=0.9',
      //     },
      //   }
      // )
      // response = http.get(
      //   'https://doctor.mountsinai.org/_next/image?url=%2Fassets%2Fprev_arrow_inactive.svg&w=32&q=75',
      //   {
      //     headers: {
      //       'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      //       'if-none-match': '6XExblj8R+MYflIKjhDWy2fyf-YtYajF1ZTBbexido4=',
      //       'sec-ch-ua-mobile': '?0',
      //       'sec-ch-ua-platform': '"Windows"',
      //       accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      //       'sec-fetch-site': 'same-origin',
      //       'sec-fetch-mode': 'no-cors',
      //       'sec-fetch-dest': 'image',
      //       'accept-encoding': 'gzip, deflate, br',
      //       'accept-language': 'en-US,en;q=0.9',
      //     },
      //   }
      // )
      // response = http.get(
      //   'https://doctor.mountsinai.org/_next/image?url=%2Fassets%2Fnext_arrow.svg&w=32&q=75',
      //   {
      //     headers: {
      //       'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      //       'if-none-match': '1QV3UNCYFSPSpGcjJbZaZGWFUULA2s07JxuJnnenhQI=',
      //       'sec-ch-ua-mobile': '?0',
      //       'sec-ch-ua-platform': '"Windows"',
      //       accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      //       'sec-fetch-site': 'same-origin',
      //       'sec-fetch-mode': 'no-cors',
      //       'sec-fetch-dest': 'image',
      //       'accept-encoding': 'gzip, deflate, br',
      //       'accept-language': 'en-US,en;q=0.9',
      //     },
      //   }
      // )
    }
  )
}
}