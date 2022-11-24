import { sleep, group,check } from 'k6'
import http from 'k6/http'

export const options = {
   vus: 10, 
  duration: '2m',
  thresholds: {
  http_req_failed: ['rate<0.01'], // http errors should be less than 1%
  http_req_duration: ['p(95)<20001'], // 95% of requests should be below 20000ms
},
}

export default function main() {
  let response

  group('page_2 - https://www.mountsinai.org/appointment', function () {
    response = http.get('https://www.mountsinai.org/appointment', {
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
    })
    check(response,{
      "find doctor status is ok 200": (r)=> r.status === 200,
  })
    sleep(98.5)
  })

  group('page_4 - https://raa.mountsinai.org/makeappt/procApptReq.cfm', function () {
    response = http.post(
      'https://raa.mountsinai.org/makeappt/procApptReq.cfm',
      {
        REASONFORVISIT: '',
        SPECIALIZATION: 'Ear, Nose, Throat (Otolaryngology)',
        additional_info: '',
        campaign: '',
        channel_source: '',
        country: 'n/a',
        dept: '',
        div: '',
        dob: '01/05/2000',
        email: 'realvk4n@gmail.com',
        existing_patient: 'N',
        firstname: 'rakesh',
        gender: 'M',
        input_addr1: '2334, nelco test',
        input_addr2: '',
        input_city: 'Albnay',
        input_state: 'NY',
        input_zip: '10023',
        ins_primary: 'N/A',
        isSpecialty: 'true',
        lastname: 'singh',
        location_utm: '',
        oid: 'MSH00100OOO00000000020',
        ou_id: '',
        phone_primary: '9845683896',
        pid: 'MSH00000DDD00000000020',
        pref_comm_time: 'Afternoon (12pm-5pm)',
        pref_language: 'English',
        request_type: 'spec',
        requestor_rel: 'n/a',
        service_area: '',
      },
      {
        headers: {
          'sec-ch-ua': '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'upgrade-insecure-requests': '1',
          origin: 'https://raa.mountsinai.org',
          'content-type': 'application/x-www-form-urlencoded',
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
      "find doctor status is ok 200": (r)=> r.status === 200,
  })
  })

}


