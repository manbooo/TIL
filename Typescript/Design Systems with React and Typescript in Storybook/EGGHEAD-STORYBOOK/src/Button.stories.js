import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs/react'
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
        <Button disabled={boolean('disabled', false)}>
            {text('text', 'Hello world')}
        </Button>
    ))
