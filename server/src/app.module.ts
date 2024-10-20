import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { BusinessUsersModule } from './business-users/business-users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tooGoodToGo'),
    UsersModule,
    ProductsModule,
    OrdersModule,
    BusinessUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
