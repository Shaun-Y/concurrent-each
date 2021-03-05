import packageJson from './package.json';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [babel({ exclude: 'node_modules/**' }), terser(), resolve(), commonjs()],
};
