import { add_Area_object } from './Place_class.js';

function init_areas(areas) {
    let id;
    id = 'village'; //村庄
    add_Area_object(areas, id);

    id = 'village_backhill'; //村外后山
    add_Area_object(areas, id);
    //添加即刻生效型的采集危险
    areas[id].set_start_foraging_danger('use_health_point', -1, -5);
    areas[id].set_start_foraging_danger('use_energy_point', 1, 5);
    //添加持续生效型的采集危险
    areas[id].set_continuous_foraging_danger('use_energy_point', 1, 2, 1, 5);

    id = 'backhill_cave'; //村外后山洞穴
    add_Area_object(areas, id);
}

export { init_areas };
