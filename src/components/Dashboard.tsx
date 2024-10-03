import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"


const Dashboard = () => {
    
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm min-h-[150px]">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-2xl line-clamp-1">
                       Your Accounts
                    </CardTitle>
                    <Button
                        className="sm"
                        onClick={()=>{}}
                    >
                        <Plus className="size-4 mr-2"/> 
                        Add new account
                    </Button>
                </CardHeader>
                <CardContent>
                    <div>
                        
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard