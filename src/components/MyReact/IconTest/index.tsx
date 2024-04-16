import { IconAdd } from '../components/Icon/icons/IconAdd';
import { IconEmail } from '../components/Icon/icons/IconEmail';
import IconFont from '../components/Icon/IconFont';

export function IconTest() {
    return (
        <div style={ {padding: '50px'} }>
            <div>
                <IconAdd size="40px"></IconAdd>

                <IconEmail spin></IconEmail>

                <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
            </div>
            
            <div style={{marginTop: '40px'}}>
                <IconFont
                    type="icon-shouye-zhihui"
                    size="40px"
                />
            
                <IconFont
                    type="icon-gerenzhongxin-zhihui"
                    // fill="blue"
                    size="40px"
                    style={{color: 'red'}}
                />
            </div>
        </div>
    );
}
