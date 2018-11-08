import React from 'react'
import { storiesOf } from '@storybook/react'
import { color } from '@storybook/addon-knobs/react'
import { wInfo } from './utils'

import { Button } from './Button'

storiesOf('Button', module)
    .addWithJSX(
        'with background',
        wInfo(`
      description
      
      ~~~js
      <Button>slkdjslkdj</Button>
      ~~~`)(() => <Button bg="palegoldenrod">Hello world</Button>),
    )
    .addWithJSX('with background 2', () => (
        <Button bg={color('bg', 'green', 'group1')}>Hello world2</Button>
    ))
