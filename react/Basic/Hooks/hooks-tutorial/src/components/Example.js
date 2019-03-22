import React, { useState } from 'react'

const Example = () => {
  //   const [name, setName] = useState('name')
  //   const [email, setEmail] = useState('email')

  const name = useFormInput('name')
  const email = useFormInput('email')

  return (
    <>
      <input {...name} />
      <input {...email} />
    </>
  )
}

const useFormInput = defaultValue => {
  const [value, setValue] = useState(defaultValue)

  const changeValue = e => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: changeValue
  }
}

export default Example
