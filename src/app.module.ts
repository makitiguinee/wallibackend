import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { RoleController } from './dev/role/role.controller';
import { ClientModule } from './client/client.module';
import { SyndicatModule } from './syndicat/syndicat.module';
import { LineModule } from './line/line.module';
import { EnginModule } from './engin/engin.module';
import { TaxeModule } from './taxe/taxe.module';
import { GareModule } from './gare/gare.module';
import { PassagerModule } from './passager/passager.module';
import { DestinationModule } from './destination/destination.module';
import { BoutiqueModule } from './boutique/boutique.module';
import { ProduitModule } from './produit/produit.module';
import { TrajetModule } from './trajet/trajet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    PrismaModule,
    RoleModule,
    ClientModule,
    SyndicatModule,
    LineModule,
    EnginModule,
    TaxeModule,
    GareModule,
    PassagerModule,
    DestinationModule,
    BoutiqueModule,
    ProduitModule,
    TrajetModule,
  ],
  controllers: [RoleController],
})
export class AppModule {}
