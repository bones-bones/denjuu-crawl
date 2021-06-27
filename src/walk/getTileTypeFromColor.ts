import { tilemap } from "./spawnMap"


export const getTileTypeFromColor=(r:number,g:number,b:number)=>{
    const roadDistance=(getColorDistance(r,g,b,99,103,114))
    const houseDistance=(getColorDistance(r,g,b,243,252,255))
    const forrestDistance=(getColorDistance(r,g,b,30,47,20))
    const roofDistance=(getColorDistance(r,g,b,144,109,112))

    if(roadDistance<houseDistance&&roadDistance<forrestDistance&&roadDistance<roofDistance){
        return tilemap.redEarth
    }else if(houseDistance<roofDistance&&houseDistance<forrestDistance&&houseDistance<roadDistance){
        return tilemap.desk
    }else if(roofDistance<houseDistance&&roofDistance<forrestDistance&&roofDistance<roadDistance){
        return tilemap.roofTile
    }else if(forrestDistance<houseDistance&&forrestDistance<roofDistance&&forrestDistance<roadDistance){
        return tilemap.mediumGrass
    }
   return tilemap.barrel

}

// NOTES
// Grass
// forest
// road
// roof
// building

// road is 636772, 5e606e, 606a70   99,103,114. 94,96,110. 96, 106, 112. 
// house is ffffff, f3fcff, 9da5a2  255, 255, 255. 243, 252, 255
// forrest is 465752                70, 87 ,82
// roof is 906d70, a29179, a0827b   144, 109, 112. 162, 145, 121. 160, 130, 123. 


/**
 * Returns a value 0 - 195075
 */
 export const getColorDistance=(
    r: number,
    g: number,
    b: number,
    r2: number,
    g2: number,
    b2: number
) =>
     (r - r2) * (r - r2) + (b - b2) * (b - b2) + (g - g2) * (g - g2)
