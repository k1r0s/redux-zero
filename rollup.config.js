import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import peerDeps from 'rollup-plugin-peer-deps-external'
import multiEntry from 'rollup-plugin-multi-entry'

const format = process.env.NODE_ENV
const isUmd = format === 'umd'
const file = `dist/redux-zero.${isUmd ? 'min' : format}.js`

const config = {
  input: ['./src/index.ts', './src/react/index.ts'],
  name: 'redux-zero',
  sourcemap: true,
  output: {
    file,
    format,
  },
  plugins: [
    peerDeps(),
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    multiEntry(),
  ],
}

isUmd && config.plugins.push(uglify(), filesize())

export default config
