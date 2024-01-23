import { Radio, Dropdown, Collapse } from "@nextui-org/react";
export { Search };

function Search(props) {

    const type = [{
        name: "type1",
        key: 'chk1',
        label: 'Quản lý',
    },
    {
        name: "type2",
        key: 'chk2',
        label: 'Nhân viên',
    },
    {
        name: "type3",
        key: 'chk3',
        label: 'Khách hàng',
    },
    {
        name: "type4",
        key: 'chk4',
        label: 'Tất cả',
    }
    ]

    function handleSubmit(event) {
        if (event.target.name === "searchForm") {
            
        }
    }

    return (
        <form name="searchForm" onSubmit={handleSubmit}>
            <div id="head" className="row form-group col-12 mx-0 pt-2">
                <span className="col-2">
                </span>
                <input className="form-control col-5" type="text" name="query" placeholder="Nhập thông tin cần tìm" />
                <div className="col-2">
                    <button name="search"  type="submit" className="mr-2 mb-1 btn btn-outline-primary">
                    <i class="fa fa-search"></i>
                            Tìm kiếm
                        </button>
                </div>
                {/* <Collapse expanded={false} divider={false} >
                    <div id="condition_type" className="row col-12 mb-1">
                        <div id="types" className="row col-2">
                            <span className="col-2" style={{ fontWeight: 'bold' }}>Nhóm</span>
                            {type.map((item) => {
                                return (
                                    <div key={item.key} className="custom-control custom-checkbox">
                                        <input name={item.name} type="checkbox" className="custom-control-input mr-2" id={item.name}>
                                        </input>
                                        <label className="custom-control-label mr-2" htmlFor={item.name}>&nbsp;{item.label}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Collapse> */}
            </div>
        </form>
    );
}

