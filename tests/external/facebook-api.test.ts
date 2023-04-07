import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('Should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAANqiZBX6wcIBAIZBE4UUec4E1xAT1p3VpESL3efxd1IU6G1rpuNid42T0jzcDrgoMqQY6UwJzUdTa2rrbeZBMIUZBjH5zCXC8sp8HT74ZBTEivNt57BvZAVbRNb0pf7ElclOWmt30l6UCdetHdaCQJWBL3LcIhAIqzYq5rZAYkVOe50VZAIcrf4HrSpbimJ2P5ZANTxrHqWFgWOOKB2sq91MP7vC1CcIeQDtet5ZCbdkixjBshdXxjDhZBjXE1BlBpcUsZD' })

    expect(fbUser).toEqual({
      facebookId: '6389745364380689',
      email: 'roberto.munhoz@terra.com.br',
      name: 'Roberto Munhoz'
    })
  })

  it('Should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
