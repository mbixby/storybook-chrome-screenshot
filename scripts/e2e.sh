#!/bin/bash

run() {
  pushd $1
  if [[ ! -d 'node_modules' ]]; then
    yarn --pure-lockfile
  fi
  rm -rf __screenshots__
  npm run screenshot
  count=$(ls __screenshots__ | wc -w)
  if [ "$count" -eq 0 ]; then
    echo "There is no PNG files... 😢"
    popd
    exit 1
  fi
  echo "✨ screenshot in $1 is ended successfully ✨"
  popd
}

run examples/react && run examples/angular && run examples/vue
