import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService : AdminService){}

    @Get()
    getUsersList(){
        return this.adminService.getUsers();
    }

    @Delete(":id")
    deleteUser(@Param("id") data : any){
        return this.adminService.deleteUser(data);
    }

    @Post(":id")
    enableUser(@Param("id") data : any){
        return this.adminService.enableUser(data);
    }
    
}
