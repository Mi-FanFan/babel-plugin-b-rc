# babel-plugin-b-rc
A babel plugin work for b-rc and b-rc-m in order to support tree-shaking.


.babelrc

```

{
  "plugins": [
    ["b-rc", [{style: true}]],  // set the style param will import the style files.
  ]
}


```


from 

```

import {Refresh, DatePicker} from 'b-rc-m'

```

to

```

import Refresh from 'b-rc-m/lib/refresh
import DatePicker from 'b-rc-m/lib/date-picker'

```