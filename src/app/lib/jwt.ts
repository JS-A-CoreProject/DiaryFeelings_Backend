import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import queryPromise from '@/app/lib/db'
interface signOption {
  expiresIn: string | number
}

const DEFAULT_SIGN_OPTION: signOption = {
  expiresIn: '5s',
}

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: signOption = DEFAULT_SIGN_OPTION,
) => {
  const secret_key = process.env.SECRET_KEY
  const token = jwt.sign(payload, secret_key!, options)
  return token
}

export const signJwtRefreshToken = async (user_id: string) => {
  const secret_key = process.env.SECRET_KEY
  const token = jwt.sign({}, secret_key!, {
    expiresIn: '14d',
  })
  let sql = 'SELECT user_token FROM tb_refresh_token WHERE user_id = ?'
  let result = await queryPromise(sql, [user_id])
  if (result.length < 1) {
    // 값이 없다면 새로 생성해야 됨.
    sql = 'INSERT INTO tb_refresh_token VALUES(?,?)'
    result = await queryPromise(sql, [user_id, token])
  } else {
    // 값이 있다면 업데이트 해야 됨.
    sql = 'UPDATE TOKEN SET tb_refresh_token = ? WHERE user_id = ?'
    sql = 'UPDATE tb_refresh_token SET user_token = ? WHERE user_id = ?'
    result = await queryPromise(sql, [token, user_id])
  }
  return token
}

export const verifyJwt = (token: string) => {
  try {
    const secret_key = process.env.SECRET_KEY
    const decoded = jwt.verify(token, secret_key!)
    const currentTime = Math.floor(Date.now() / 1000) - 60000 // 갱신할 시간.
    return decoded as JwtPayload
  } catch (err) {
    // 에러.
    return 'signout'
  }
}

export const verifyRefresh = (token: string) => {
  try {
    const secret_key = process.env.SECRET_KEY
    const decoded = jwt.verify(token, secret_key!)
    return decoded as JwtPayload
  } catch (err) {
    console.log(err)
    return null
  }
}
