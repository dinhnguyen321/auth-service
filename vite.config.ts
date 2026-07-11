import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    // Cấu hình port chạy môi trường dev của Vite
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      // Đường dẫn đến file main.ts của dự án
      appPath: './src/main.ts',
      // Tên biến export ứng dụng NestJS (sẽ cấu hình ở bước 3)
      exportName: 'authService',
      tsCompiler: 'esbuild',
    }),
  ],
  optimizeDeps: {
    // Loại bỏ các thư viện core của NestJS khỏi việc tối ưu hóa của Vite để tránh lỗi
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
    ],
  },
});
