// J2ME Starter Template

import javax.microedition.lcdui.*;
import javax.microedition.midlet.*;

public class Main extends MIDlet implements CommandListener {
    private Display display;
    private Form form;
    private Command exitCommand;

    public void startApp() {
        display = Display.getDisplay(this);
        form = new Form("J2ME Starter Template");
        exitCommand = new Command("Exit", Command.EXIT, 1);
        form.addCommand(exitCommand);
        form.setCommandListener(this);
        display.setCurrent(form);
    }

    public void pauseApp() {
    }

    public void destroyApp(boolean unconditional) {
    }

    public void commandAction(Command command, Displayable displayable) {
        if (command == exitCommand) {
            notifyDestroyed();
        }
    }
}